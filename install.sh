# Install Avahi

echo "Installing avahi"
sudo apt update
sudo apt install avahi-daemon

# Install NginX

echo "Installing Nginx"
sudo apt install nginx
sudo /etc/init.d/nginx start


