import os
import re
from pathlib import Path

def extract_metadata_and_content(file_path):
    """Extract metadata and content from markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if it's a redirect page
    if 'redirect_to:' in content or 'http_status: 301' in content:
        return None, None, True
    
    # Extract metadata
    metadata = {}
    
    # URL
    url_match = re.search(r'\*\*URL:\*\*\s*`([^`]+)`', content)
    if url_match:
        metadata['url'] = url_match.group(1).strip()
    
    # Title tag
    title_match = re.search(r'\*\*Title tag:\*\*\s*(.+?)(?:\n|$)', content)
    if title_match:
        metadata['title_tag'] = title_match.group(1).strip()
    
    # Meta description
    meta_match = re.search(r'\*\*Meta description:\*\*\s*(.+?)(?:\n|$)', content)
    if meta_match:
        metadata['meta_description'] = meta_match.group(1).strip()
    
    # Schema - extract only the schema part (before the ·)
    schema_match = re.search(r'\*\*Schema:\*\*\s*(.+?)(?:\n|$)', content)
    if schema_match:
        schema_text = schema_match.group(1).strip()
        # Extract just the schema part (before the first · or **)
        schema_parts = schema_text.split('·')
        metadata['schema'] = schema_parts[0].strip() if schema_parts else schema_text
    
    # Page type - extract only the page type part
    page_type_match = re.search(r'\*\*Page type:\*\*\s*(.+?)(?:\n|$)', content)
    if page_type_match:
        page_text = page_type_match.group(1).strip()
        # Extract just the page type (before the · or **)
        page_parts = page_text.split('·')
        metadata['page_type'] = page_parts[0].strip() if page_parts else page_text
    
    # Primary keyword - extract only the primary keyword
    keyword_match = re.search(r'\*\*Primary keyword:\*\*\s*(.+?)(?:\n|$)', content)
    if keyword_match:
        keyword_text = keyword_match.group(1).strip()
        # Extract just the keyword (before the parentheses)
        keyword_parts = keyword_text.split('(')
        metadata['primary_keyword'] = keyword_parts[0].strip() if keyword_parts else keyword_text
    
    # Also capture the full line for debugging
    if schema_match:
        metadata['schema_full'] = schema_match.group(1).strip()
    if page_type_match:
        metadata['page_type_full'] = page_type_match.group(1).strip()
    if keyword_match:
        metadata['primary_keyword_full'] = keyword_match.group(1).strip()
    
    # Extract the main content (everything after the metadata block)
    lines = content.split('\n')
    content_start = 0
    
    # Find where the content actually starts (after the metadata)
    for i, line in enumerate(lines):
        if line.startswith('# ') and i > 0:
            content_start = i
            break
    
    # If we found a header, use it; otherwise try to find the content
    if content_start > 0:
        body = '\n'.join(lines[content_start:])
    else:
        # Find the first line that's not metadata
        for i, line in enumerate(lines):
            if line.strip() and not line.startswith('**') and not line.startswith('*'):
                if 'URL:' not in line and 'Title tag:' not in line and 'Meta description:' not in line:
                    if 'Schema:' not in line and 'Page type:' not in line and 'Primary keyword:' not in line:
                        content_start = i
                        break
        
        if content_start > 0:
            body = '\n'.join(lines[content_start:])
        else:
            body = content
    
    # Clean up the body - remove metadata lines if they're still there
    body_lines = body.split('\n')
    cleaned_lines = []
    skip_metadata = True
    
    for line in body_lines:
        # Skip the written by and figures lines
        if skip_metadata and (line.startswith('*Written by') or line.startswith('*Figures in this guide')):
            continue
        # Start keeping when we hit the quick answer or a header
        if skip_metadata and (line.startswith('> **Quick answer:**') or line.startswith('# ')):
            skip_metadata = False
        # If we're not skipping, keep the line
        if not skip_metadata:
            cleaned_lines.append(line)
        # Also keep if it's not a metadata line
        elif line.strip() and not line.startswith('**') and not line.startswith('*'):
            if 'URL:' not in line and 'Title tag:' not in line and 'Meta description:' not in line:
                if 'Schema:' not in line and 'Page type:' not in line and 'Primary keyword:' not in line:
                    cleaned_lines.append(line)
    
    body = '\n'.join(cleaned_lines).strip()
    
    return metadata, body, False

def get_slug_from_url(url):
    """Extract slug from URL like /ai-agency/"""
    # Remove leading and trailing slashes
    slug = url.strip('/')
    # Replace any other slashes with dashes
    slug = slug.replace('/', '-')
    return slug

def process_folder(folder_path, output_dir):
    """Process all markdown files in a folder"""
    folder_name = os.path.basename(folder_path)
    output_file = os.path.join(output_dir, f"{folder_name}.ts")
    
    files_data = []
    
    # Get all markdown files
    md_files = sorted([f for f in os.listdir(folder_path) if f.endswith('.md')])
    
    for md_file in md_files:
        file_path = os.path.join(folder_path, md_file)
        metadata, body, is_redirect = extract_metadata_and_content(file_path)
        
        if is_redirect:
            print(f"Skipping redirect: {md_file}")
            continue
        
        if metadata and body:
            # Get slug from URL
            slug = get_slug_from_url(metadata.get('url', ''))
            if not slug:
                # Fallback: use filename without .md
                slug = md_file.replace('.md', '')
            
            files_data.append({
                'filename': md_file,
                'slug': slug,
                'metadata': metadata,
                'body': body
            })
    
    if files_data:
        # Write to TypeScript file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('// Auto-generated from markdown files\n\n')
            f.write('// Folder: ' + folder_name + '\n\n')
            
            # Export as an array of objects
            f.write('export const data = [\n')
            
            for i, item in enumerate(files_data):
                # Escape the body content for JavaScript string
                body_escaped = item['body'].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
                body_escaped = body_escaped.replace('"', '\\"')
                
                # Clean metadata values
                title_tag = item['metadata'].get('title_tag', '').replace(':', '').replace('"', '\\"')
                meta_desc = item['metadata'].get('meta_description', '').replace(':', '').replace('"', '\\"')
                schema = item['metadata'].get('schema', '').replace(':', '').replace('"', '\\"')
                page_type = item['metadata'].get('page_type', '').replace(':', '').replace('"', '\\"')
                primary_keyword = item['metadata'].get('primary_keyword', '').replace(':', '').replace('"', '\\"')
                
                f.write('  {\n')
                f.write(f'    slug: "{item["slug"]}",\n')
                f.write(f'    filename: "{item["filename"]}",\n')
                f.write('    metadata: {\n')
                f.write(f'      url: "{item["metadata"].get("url", "")}",\n')
                f.write(f'      title_tag: "{title_tag}",\n')
                f.write(f'      meta_description: "{meta_desc}",\n')
                f.write(f'      schema: "{schema}",\n')
                f.write(f'      page_type: "{page_type}",\n')
                f.write(f'      primary_keyword: "{primary_keyword}",\n')
                f.write('    },\n')
                f.write(f'    content: `{body_escaped}`,\n')
                f.write('  },\n')
            
            f.write('];\n')
            
            # Also export individual items by slug
            f.write('\n// Individual exports by slug\n')
            for item in files_data:
                var_name = item['slug'].replace('-', '_')
                f.write(f'export const {var_name} = data.find(d => d.slug === "{item["slug"]}");\n')
            
            # Export all slugs
            f.write('\n// All slugs\n')
            slugs = [f'"{item["slug"]}"' for item in files_data]
            f.write(f'export const slugs = [{", ".join(slugs)}];\n')
            
            # Export default for easy importing
            f.write('\nexport default data;\n')
        
        print(f"✅ Created {output_file} with {len(files_data)} files")
    else:
        print(f"⚠️  No valid markdown files found in {folder_name}")

def main():
    # Get the current directory (where the script is)
    script_dir = Path(__file__).parent.absolute()
    
    # Content folder path
    content_dir = script_dir / 'content'
    
    # Create content directory if it doesn't exist
    content_dir.mkdir(exist_ok=True)
    
    # Get all subdirectories except 'content' and hidden directories
    folders = [d for d in script_dir.iterdir() if d.is_dir() and d.name != 'content' and not d.name.startswith('.')]
    
    # Sort folders for consistent output
    folders = sorted(folders)
    
    print(f"📁 Found {len(folders)} folders to process\n")
    
    for folder in folders:
        print(f"📂 Processing folder: {folder.name}")
        process_folder(folder, content_dir)
    
    # Create an index file that exports everything
    index_file = content_dir / 'index.ts'
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write('// Auto-generated index file\n\n')
        f.write('// This file exports all content from all folders\n\n')
        
        # Import all folder exports
        for folder in folders:
            if folder.name != 'content':
                import_name = folder.name.replace('-', '_')
                f.write(f'import {import_name} from "./{folder.name}.js";\n')
        
        f.write('\n// Export everything as named exports\n')
        for folder in folders:
            if folder.name != 'content':
                import_name = folder.name.replace('-', '_')
                f.write(f'export {{ default as {import_name} }} from "./{folder.name}.js";\n')
        
        f.write('\n// Also export as a single combined object\n')
        f.write('export const allData = {\n')
        for folder in folders:
            if folder.name != 'content':
                import_name = folder.name.replace('-', '_')
                f.write(f'  {import_name},\n')
        f.write('};\n')
        
        # Export all slugs from all folders
        f.write('\n// All slugs across all folders\n')
        f.write('export const allSlugs = [\n')
        for folder in folders:
            if folder.name != 'content':
                f.write(f'  ...{folder.name.replace("-", "_")}.slugs,\n')
        f.write('];\n')
    
    print(f"\n✅ Created index file: {index_file}")
    print("🎉 Done!")

if __name__ == "__main__":
    main()