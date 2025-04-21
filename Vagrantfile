Vagrant.configure("2") do |config| 
  config.vm.box = "bento/ubuntu-20.04"
  config.vm.synced_folder "data/", "/vagrant"


  config.vm.define :loadBalancer do |loadBalancer| 
    loadBalancer.vm.network :private_network, ip: "192.168.90.2" 
    loadBalancer.vm.hostname = "loadBalancer"
  end 

  config.vm.define :maestro do |maestro|
    maestro.vm.network :private_network, ip: "192.168.90.3"
    maestro.vm.provision "shell", path: "provision/provision_mysql.sh"
  end   

  config.vm.define :esclavoUno do |esclavoUno|
    esclavoUno.vm.network :private_network, ip: "192.168.90.4"
    esclavoUno.vm.hostname = "esclavoUno"
  end   

  config.vm.define :esclavoDos do |esclavoDos|
    esclavoDos.vm.network :private_network, ip: "192.168.90.5"
    esclavoDos.vm.hostname = "esclavoDos"
    esclavoDos.vm.provider "virtualbox" do |vb|
      vb.memory = 4096
      vb.cpus = 4
    end
  end   
end 
