# Gunakan Node.js versi ringan
FROM node:18-alpine

# Tentukan working directory di dalam container
WORKDIR /app

# Copy file yang dibutuhkan untuk install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode proyek
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# Port yang akan digunakan oleh aplikasi
ENV PORT=5000

# Jalankan aplikasi menggunakan Vite Preview dengan port yang diberikan
EXPOSE 5000
CMD ["npm", "run", "preview", "--", "--port", "5000", "--host"]
