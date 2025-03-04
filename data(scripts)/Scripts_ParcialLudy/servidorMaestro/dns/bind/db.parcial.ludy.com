$TTL    604800
@       IN      SOA     ns.parcial.ludy.com. root.parcial.ludy.com. (
                         2              ; Serial
                         604800         ; Refresh
                         86400          ; Retry
                         2419200        ; Expire
                         604800 )       ; Negative Cache TTL                                                                                                                                                                                                                                                            ;Servidores de nombres
@       IN      NS      ns.parcial.ludy.com.
@       IN      A       192.168.50.3
ns      IN      A       192.168.50.3
server  IN      CNAME   ns
www     IN      CNAME   ns
