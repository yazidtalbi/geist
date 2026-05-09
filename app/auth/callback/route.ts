import { NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase-server'
import { sendEmail } from '@/lib/email'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in search params, use it as the redirection URL after successful sign in
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session?.user) {
      const user = session.user
      
      // Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!profile) {
        // This is a new registration
        const fullName = user.user_metadata.full_name || user.email?.split('@')[0] || "User"
        const firstName = fullName.split(' ')[0]

        // 1. Create the profile on the server
        await supabase.from('profiles').insert({
          id: user.id,
          name: fullName,
          avatar: user.user_metadata.avatar_url || "",
          role: "User",
          reputation: 0,
          badges: ["Explorer"]
        })

        // 2. Send the welcome email (non-blocking)
        sendEmail({
          to: user.email!,
          subject: 'Welcome to Revvview',
          template: 'welcome',
          variables: {
            first_name: firstName
          }
        }).catch(err => console.error("Welcome email failed:", err))
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // handled by Vercel
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/?error=auth-code-error`)
}
