$TTL 86400
@   IN  SOA ns.parcial.sergio.com. admin.parcial.sergio.com. (
        2024030302 ; Serial (incrementa este número si editas)
        3600       ; Refresh
        1800       ; Retry
        604800     ; Expire
        86400 )    ; Minimum TTL

@       IN  NS  ns.parcial.sergio.com.
ns      IN  A   192.168.50.3
web     IN  A   192.168.50.3

