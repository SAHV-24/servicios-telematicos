sudo ufw deny from 192.168.90.2 to any port 80 proto tcp
echo "SERVIDOR HTTP INNACCESSIBLE"


sudo ufw deny from 192.168.90.2 to any port 443 proto tcp
echo "SERVIDOR HTTPS INNACCESSIBLE"

