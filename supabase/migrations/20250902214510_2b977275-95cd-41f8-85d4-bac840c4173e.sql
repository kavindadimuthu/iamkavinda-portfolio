-- Create authors table
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  cover_image_url TEXT
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blog_tags junction table
CREATE TABLE public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(blog_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin access
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.email() = 'kavindadewmith@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Authors policies
CREATE POLICY "Anyone can view authors" ON public.authors
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage authors" ON public.authors
  FOR ALL USING (public.is_admin());

-- Blogs policies  
CREATE POLICY "Anyone can view published blogs" ON public.blogs
  FOR SELECT USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin can manage blogs" ON public.blogs
  FOR ALL USING (public.is_admin());

-- Tags policies
CREATE POLICY "Anyone can view tags" ON public.tags
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage tags" ON public.tags
  FOR ALL USING (public.is_admin());

-- Blog_tags policies
CREATE POLICY "Anyone can view blog_tags" ON public.blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage blog_tags" ON public.blog_tags
  FOR ALL USING (public.is_admin());

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE ON public.authors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert admin author
INSERT INTO public.authors (name, email, bio) 
VALUES ('Kavinda Dewmith', 'kavindadewmith@gmail.com', 'Full-stack developer and portfolio owner')
ON CONFLICT (email) DO NOTHING;

-- Create storage policy for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'BLOG_IMAGES_BUCKET');

CREATE POLICY "Admin can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'BLOG_IMAGES_BUCKET' AND public.is_admin());

CREATE POLICY "Admin can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'BLOG_IMAGES_BUCKET' AND public.is_admin());

CREATE POLICY "Admin can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'BLOG_IMAGES_BUCKET' AND public.is_admin());