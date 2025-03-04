# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config| 

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

end 
  
