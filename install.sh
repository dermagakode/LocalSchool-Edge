# Install Avahi

echo "Installing avahi"
sudo apt update
sudo apt install avahi-daemon

# Install NginX

echo "Installing Nginx"
sudo apt install nginx
sudo /etc/init.d/nginx start

# Installing Filebrowser

echo "Installing Filebrowser"
curl -fsSL https://filebrowser.org/get.sh | bash
cd /usr/local/bin

echo "running Filebrowser"
sudo filebrowser 