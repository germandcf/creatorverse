-- ========================================
-- CREATORVERSE DATABASE SETUP
-- ========================================

-- Drop existing table if exists (for clean setup)
DROP TABLE IF EXISTS creators;

-- ========================================
-- CREATORS TABLE
-- ========================================
CREATE TABLE creators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  youtube TEXT,
  twitter TEXT,
  instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TRIGGER FOR UPDATED_AT
-- ========================================
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger that calls the function before any update
CREATE TRIGGER update_creators_updated_at 
BEFORE UPDATE ON creators 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA (Optional - for testing)
-- ========================================
INSERT INTO creators (name, description, image_url, youtube, twitter, instagram) VALUES
('Tech Creator', 'Technology and gadgets expert sharing the latest in tech reviews and tutorials', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', 'https://youtube.com/techcreator', 'https://twitter.com/techcreator', 'https://instagram.com/techcreator'),
('Gaming Streamer', 'Professional gamer streaming daily gameplay and gaming tips', 'https://images.unsplash.com/photo-1594736797933-d0acc240191b6?w=400&h=400&fit=crop&crop=face', 'https://youtube.com/gamer', 'https://twitter.com/gamer', 'https://instagram.com/gamer'),
('Design Artist', 'Digital artist creating amazing designs and tutorials', 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=400&h=400&fit=crop&crop=face', 'https://youtube.com/designer', 'https://twitter.com/designer', 'https://instagram.com/designer'),
('Music Producer', 'Music producer creating beats and sharing production tips', 'https://images.unsplash.com/photo-15163792534-d4a9e5d6c1c0?w=400&h=400&fit=crop&crop=face', 'https://youtube.com/producer', 'https://twitter.com/producer', 'https://instagram.com/producer'),
('Fitness Coach', 'Personal trainer sharing workout routines and health tips', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face', 'https://youtube.com/fitness', 'https://twitter.com/fitness', 'https://instagram.com/fitness');

-- ========================================
-- INDEXES (for better performance)
-- ========================================
CREATE INDEX idx_creators_name ON creators(name);
CREATE INDEX idx_creators_created_at ON creators(created_at);

-- ========================================
-- ROW LEVEL SECURITY (Optional - for production)
-- ========================================
-- Enable RLS
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access" ON creators
FOR SELECT USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert" ON creators
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update" ON creators
FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete
CREATE POLICY "Authenticated users can delete" ON creators
FOR DELETE USING (auth.role() = 'authenticated');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Test the table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'creators'
ORDER BY ordinal_position;

-- Test sample data
SELECT * FROM creators ORDER BY created_at DESC;

-- Test trigger
INSERT INTO creators (name, description) VALUES ('Test Creator', 'This should auto-update updated_at');
UPDATE creators SET description = 'Updated description' WHERE name = 'Test Creator';
SELECT name, created_at, updated_at FROM creators WHERE name = 'Test Creator';

-- Clean up test data
DELETE FROM creators WHERE name = 'Test Creator';

-- ========================================
-- SETUP COMPLETE
-- ========================================
-- Your database is now ready for the Creatorverse app!
-- 
-- Next steps:
-- 1. Copy your Supabase URL and anon key
-- 2. Update your .env file
-- 3. Run npm run dev
-- 4. Test the application
