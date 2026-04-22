# Creatorverse

A modern web application for managing content creators with their social media profiles, built with React, Vite, and Supabase.

## **Key Features**

### **Creator Management**
- **Create** new creators with complete information
- **View** creator list with visual profile cards
- **Edit** existing creator information
- **Delete** creators with confirmation modal
- **Detailed view** for each creator with professional design

### **Design & UX**
- **Modern interface** with elegant dark theme
- **Profile cards** with background images
- **Social media icons** using Font Awesome
- **Responsive design** for desktop and mobile
- **Smooth animations** and hover effects

### **Technologies**
- **Frontend**: React 18, Vite, React Router
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Pure CSS with custom variables
- **Icons**: Font Awesome Brands
- **Build**: Vite for fast development

---

## **Installation & Setup**

### **Prerequisites**
- Node.js 16+ installed
- Supabase account created
- Git installed

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/creatorverse.git
cd creatorverse
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Supabase**

#### **3.1 Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create account or sign in
3. Create new project named "creatorverse"
4. Copy your **URL** and **anon key** from dashboard

#### **3.2 Setup Database**
Execute this SQL in Supabase SQL Editor:

```sql
-- Create creators table
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

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_creators_updated_at 
BEFORE UPDATE ON creators 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO creators (name, description, image_url, youtube, twitter, instagram) VALUES
('Tech Creator', 'Technology and gadgets expert', 'https://example.com/tech.jpg', 'https://youtube.com/techcreator', 'https://twitter.com/techcreator', 'https://instagram.com/techcreator'),
('Gaming Streamer', 'Professional video game player', 'https://example.com/gaming.jpg', 'https://youtube.com/gamer', 'https://twitter.com/gamer', 'https://instagram.com/gamer');
```

#### **3.3 Setup Environment Variables**
Create `.env` file in root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **4. Run Application**
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

---

## **Project Structure**

```
creatorverse/
src/
  components/
    CreatorCard.jsx      # Creator card component
    DeleteModal.jsx      # Confirmation modal
  pages/
    Home.jsx             # Home page
    ShowCreators.jsx     # Creator list page
    AddCreator.jsx       # Add creator form
    EditCreator.jsx      # Edit creator form
    ViewCreator.jsx      # Detailed creator view
  styles/
    globals.css          # Global styles
  supabase/
    client.js            # Supabase client
  App.jsx               # Main component
  main.jsx              # Entry point
index.html
package.json
README.md
```

---

## **Upload to GitHub**

### **1. Prepare Repository**

```bash
# Initialize Git (if not done)
git init

# Add files to staging
git add .

# Make first commit
git commit -m "Initial commit: Creatorverse app with React and Supabase"
```

### **2. Create GitHub Repository**

1. Go to [github.com](https://github.com)
2. Sign in or create account
3. Click **"New repository"**
4. Name: `creatorverse`
5. Description: `A modern web app for managing content creators with their social media`
6. Select **"Public"** or **"Private"**
7. Click **"Create repository"**

### **3. Connect Local to GitHub**

```bash
# Add GitHub remote
git remote add origin https://github.com/your-username/creatorverse.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### **4. Setup GitHub Pages (Optional)**

For free deployment:

1. In your GitHub repo, go to **Settings**
2. In left menu, go to **Pages**
3. In **Source**, select **Deploy from a branch**
4. **Branch**: `main` and **Folder**: `/root`
5. Click **Save**

Your app will be available at: `https://your-username.github.io/creatorverse`

---

## **Production Environment Variables**

If deploying to GitHub Pages or Vercel, configure these variables:

### **GitHub Pages**
1. Go to **Settings > Secrets and variables > Actions**
2. Add these secrets:
   - `VITE_SUPABASE_URL`: your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: your Supabase anon key

### **Vercel**
1. Go to your Vercel project
2. **Settings > Environment Variables**
3. Add the same variables

---

## **Useful Commands**

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Clean node_modules
rm -rf node_modules package-lock.json
npm install

# Check Font Awesome installation
npm list @fortawesome
```

---

## **Troubleshooting**

### **Common Errors**

**Error: "Failed to resolve import @fortawesome"**
```bash
npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
```

**Error: "Connection refused"**
```bash
# Restart development server
npm run dev
```

**Error: "Supabase connection failed"**
- Check your environment variables in `.env`
- Confirm your Supabase project is active
- Verify URL and anon key are correct

**Error: "ERR_CONNECTION_REFUSED"**
- Make sure Vite server is running
- Restart server with `npm run dev`

---

## **Customization**

### **Change Colors**
Edit `src/styles/globals.css`:

```css
:root {
  --primary-color: #4f7afb;     /* Primary blue */
  --background-dark: #020b16;   /* Dark background */
  --text-white: #ffffff;        /* White text */
  --accent-blue: #5d8fbe;       /* Secondary blue */
}
```

### **Add New Social Networks**
1. Add field in Supabase table
2. Update forms in `AddCreator.jsx` and `EditCreator.jsx`
3. Add corresponding Font Awesome icon

### **Modify Card Design**
Edit styles in `src/styles/globals.css`:
- `.profile-card` for main card
- `.profile-background` for background image
- `.social-icon-link` for social icons

---

## **License**

MIT License - You can use this project for personal or commercial purposes.

---

## **Contributing**

Contributions are welcome!

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## **Support**

If you have problems or questions:

1. Check the Troubleshooting section
2. Open an issue on GitHub
3. Contact directly

---

**Built with React, Vite and Supabase**  
**Icons by Font Awesome**  
**Modern Design & UX**
