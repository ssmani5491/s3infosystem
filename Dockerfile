# Use the official Nginx image as the base
FROM nginx:alpine

# Copy the website files into the default Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]


