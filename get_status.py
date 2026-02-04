import subprocess
import os

try:
    result = subprocess.check_output(["git", "status"], stderr=subprocess.STDOUT, text=True)
    with open("git_output.txt", "w") as f:
        f.write(result)
except subprocess.CalledProcessError as e:
    with open("git_output.txt", "w") as f:
        f.write(f"Error: {e.output}")
except Exception as e:
    with open("git_output.txt", "w") as f:
        f.write(f"Unexpected error: {str(e)}")
