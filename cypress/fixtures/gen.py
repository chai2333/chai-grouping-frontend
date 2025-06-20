# generate_test_files.py

def generate_file(path, size_mb):
    with open(path, 'wb') as f:
        f.write(b'\0' * int(size_mb * 1024 * 1024))
    print(f'✅ Generated: {path} ({size_mb} MB)')

if __name__ == "__main__":
    generate_file('Normal_file.txt', 0.2)
    generate_file('Semi_big_file.txt', 99)
    generate_file('Big_file.txt', 100.1)
