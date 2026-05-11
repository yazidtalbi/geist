/**
 * SOCIAL GRAPH SETUP INSTRUCTIONS
 * 
 * To enable the Following and Watching features, run the following SQL in your Supabase SQL Editor:
 * 
 */

/*
-- 1. Create follows table
CREATE TABLE IF NOT EXISTS public.follows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(follower_id, following_id)
);

-- 2. Create watches table
CREATE TABLE IF NOT EXISTS public.watches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, product_id)
);

-- 3. RLS for follows
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public follows are viewable by everyone" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow others" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- 4. RLS for watches
ALTER TABLE public.watches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public watches are viewable by everyone" ON public.watches FOR SELECT USING (true);
CREATE POLICY "Users can watch projects" ON public.watches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unwatch projects" ON public.watches FOR DELETE USING (auth.uid() = user_id);

-- 5. Helper function to check if following (optional, can be done via RLS/Select)
*/

console.log("Please copy the SQL from this file and run it in your Supabase SQL Editor to complete the social graph setup.");
