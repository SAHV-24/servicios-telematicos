;
; BIND data file for local loopback interface
;
$TTL	604800
@	IN	SOA	miotrositio.com. root.miotrositio.com. (
			      2		; Serial
			 604800		; Refresh
			  86400		; Retry
			2419200		; Expire
			 604800 )	; Negative Cache TTL
;
@	IN	NS	ns.miotrositio.com.
ns	IN	A	192.168.50.3
www	IN	A	192.168.50.3
web	IN	CNAME	ns
server	IN	CNAME	ns		
