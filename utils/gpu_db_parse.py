import csv
import re

def process_gpu_data(input_data):
    # Split the input data into lines
    lines = input_data.strip().split('\n')
    
    # Get headers and data rows
    headers = lines[0].split('\t')
    data_rows = [line.split('\t') for line in lines[1:]]
    
    # Prepare the new CSV headers
    new_headers = [
        'Product Name', 'GPU Chip', 'Released', 'Bus',
        'Memory Size', 'Memory Type', 'Memory Bits',
        'GPU clock', 'Memory clock',
        'Shaders', 'TMUs', 'ROPs'
    ]
    
    processed_rows = []
    for row in data_rows:
        # Parse memory information
        memory_info = row[4].split(', ')
        memory_size = memory_info[0]
        memory_type = memory_info[1]
        memory_bits = memory_info[2].replace(' bit', '')
        
        # Parse Shaders/TMUs/ROPs
        specs = row[7].split(' / ')
        shaders = specs[0]
        tmus = specs[1]
        rops = specs[2]
        
        # Create new row with separated values
        new_row = [
            row[0],  # Product Name
            row[1],  # GPU Chip
            row[2],  # Released
            row[3],  # Bus
            memory_size,  # Memory Size
            memory_type,  # Memory Type
            memory_bits,  # Memory Bits
            row[5],  # GPU clock
            row[6],  # Memory clock
            shaders,  # Shaders
            tmus,    # TMUs
            rops     # ROPs
        ]
        processed_rows.append(new_row)
    
    return new_headers, processed_rows

# Read from input file
with open('gpu_db_raw.txt', 'r', encoding='utf-8') as file:
    input_data = file.read()

# Process the data
headers, rows = process_gpu_data(input_data)

# Write to CSV
output_file = 'src/components/data/gpu_db.csv'
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print(f"CSV file '{output_file}' has been created successfully!")

# Print first few rows as a sample
print("\nFirst few rows of the processed data:")
print(",".join(headers))
for row in rows[:3]:
    print(",".join(row))