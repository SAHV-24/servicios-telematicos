Vagrant.configure("2") do |config| 
  # Virtual Machine that will work with Git and Python3
  config.vm.define :servidorDos do |servidorDos| 
    servidorDos.vm.box = "http-box" # Ubuntu 20.04
    servidorDos.vm.network "private_network", ip: "192.168.50.4"
    servidorDos.vm.hostname = "servidorDos"
    servidorDos.vm.synced_folder './data', "/vagrant"
  end 
end 
  
