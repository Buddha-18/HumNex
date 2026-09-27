import os, re

def replace_logo(file_path, width, height, border_radius):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'import logoImg' not in content:
        content = 'import logoImg from "../assets/logo.jpg";\n' + content

    pattern = r'<div[^>]*background: C\.teal[^>]*>\s*<Activity[^>]*/>\s*</div>'
    
    def repl(m):
        mb_match = re.search(r'marginBottom:\s*(\d+)', m.group(0))
        mb_style = f", marginBottom: {mb_match.group(1)}" if mb_match else ""
        return f'<img src={{logoImg}} alt="HumaNex Logo" style={{{{ width: {width}, height: {height}, borderRadius: {border_radius}, objectFit: "cover"{mb_style} }}}} />'

    new_content = re.sub(pattern, repl, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

replace_logo('src/pages/Auth.jsx', 30, 30, 8)
replace_logo('src/pages/DoctorDashboard.jsx', 28, 28, 7)
replace_logo('src/pages/PatientDashboard.jsx', 30, 30, 8)
replace_logo('src/pages/Landing.jsx', 28, 28, 7)
replace_logo('src/pages/About.jsx', 44, 44, 12)
