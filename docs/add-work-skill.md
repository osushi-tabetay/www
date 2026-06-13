# Skill: Add Artwork to Portfolio Gallery

This document serves as an executable skill description for the AI Assistant. When the USER asks to add their own artwork/image to the "Works" section of the portfolio, the AI Assistant should follow these instructions to complete the task automatically.

## 📋 Prerequisites

To execute this skill, the assistant needs:
1. **Source Image File**: An image file provided by the USER (either via path, direct upload, or generated asset).
2. **Metadata**: 
   - **Title**: Title of the artwork (e.g., "Deep Forest")
   - **Category**: One of `character`, `scene`, `series`, `objects`
   - **Year**: Year of creation (e.g., "2026")
   - **Client**: (Optional) Default is `"Archive"` or `"Personal Work"`
   - **Summary**: A short description (in Japanese, around 10-20 characters)
   - **Detail**: A detailed description (in Japanese, around 1-2 sentences)
   - **Tags**: A list of 2-4 tags (e.g., `["scene", "forest", "nature"]`)
   - **Palette**: (Optional) An accent hex color code (e.g., `"#5b7d6a"`). If not provided, inspect the image to find a dominant muted/aesthetic color or choose one that matches the image mood.

> [!NOTE]
> If any critical metadata (Title, Category, Summary) is missing, ask the USER for clarification before proceeding, or suggest reasonable defaults based on the image description.

---

## 🛠️ Step-by-Step Execution Plan

### Step 1: Prepare Parameters
1. **Generate ID**: Convert the artwork title into a kebab-case ID.
   - Example: `"Deep Forest"` -> `deep-forest`
2. **Determine File Paths**:
   - **Source Path**: Location of the user's image (e.g., `/Users/username/Desktop/my-drawing.png`).
   - **Target Path**: `public/assets/works/{id}.{extension}` (preserve the original file extension: `.jpg`, `.png`, or `.webp`).
   - **Portfolio URL**: `/assets/works/{id}.{extension}`

### Step 2: Copy the Image File
Use a command execution tool to copy the source image into the repository.
```bash
cp "source_path" "public/assets/works/target_filename"
```
Ensure that the destination directory `public/assets/works` exists.

### Step 3: Update `src/data/portfolio.ts`
Edit [src/data/portfolio.ts](file:///Users/manji0/src/osushi-gallary/src/data/portfolio.ts) using a code replacement tool:
1. Find the end of the `works` array.
2. Insert the new work object with the correct metadata, including the `image` path.

Example structure to insert:
```typescript
  {
    id: "deep-forest",
    title: "Deep Forest",
    category: "scene",
    year: "2026",
    client: "Personal Work",
    palette: "#5b7d6a",
    summary: "深い森の奥深く。",
    detail: "光が差し込む静かな森の小道を描いた習作です。影のグラデーションにこだわっています。",
    tags: ["scene", "forest", "light"],
    image: "/assets/works/deep-forest.jpg",
  },
```

### Step 4: Validate the Changes
Run the Astro build process to ensure that no linting or compilation errors were introduced.
```bash
pnpm run build
```

### Step 5: Report to the User
Once the build passes, inform the USER that their artwork has been successfully added. Display a summary of the added metadata and confirm that the image is in place.
