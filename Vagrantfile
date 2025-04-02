Vagrant.configure("2") do |config| 

  # Servidor Firewall:
  config.vm.define :servidorFirewall do |servidorFirewall| 
    servidorFirewall.vm.box = "firewallParcial" 
    servidorFirewall.vm.network :private_network, ip: "192.168.90.3" 
    servidorFirewall.vm.hostname = "servidorFirewall" 
  end 

  # Cliente Firewall:
  config.vm.define :clienteFirewall do |clienteFirewall| 
    clienteFirewall.vm.box = "bento/ubuntu-22.04" 
    clienteFirewall.vm.network :private_network, ip: "192.168.90.2" 
    clienteFirewall.vm.hostname = "clienteFirewall" 
  end 
  
  # Servidores:
  config.vm.define :servidor do |servidor| 
    servidor.vm.box = "bento/ubuntu-22.04" 
    servidor.vm.network "private_network", ip: "192.168.50.3"
    servidor.vm.hostname = "servidor"
    servidor.vm.synced_folder './data', "/vagrant"
  end 

  config.vm.define :servidorDos do |servidorDos| 
    #Se refiere a la box del servidor que se configuró durante el semestre (server con HTTP y DNS) 
    servidorDos.vm.box = "http-box" 
    servidorDos.vm.network "private_network", ip: "192.168.50.4"
    servidorDos.vm.hostname = "servidorDos"
    servidorDos.vm.synced_folder './data', "/vagrant"
  end 

  # Cliente:
  config.vm.define :cliente do |cliente| 
    cliente.vm.box = "bento/ubuntu-22.04" 
    cliente.vm.network :private_network, ip: "192.168.50.2" 
    cliente.vm.hostname = "cliente" 
    cliente.vm.synced_folder "./data", "/vagrant"
  end 

    # Firewall(FrontEnd):
  config.vm.define :frontEnd do |frontEnd| 
    frontEnd.vm.box = "bento/ubuntu-22.04" 
    frontEnd.vm.network :private_network, ip: "192.168.50.5" 
    frontEnd.vm.hostname = "frontEnd" 
    frontEnd.vm.synced_folder "./data", "/vagrant"
  end 
    
end 
