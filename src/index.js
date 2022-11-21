const express = require('express')
const app = express()
const si = require('systeminformation');

(async () => {

  //INFORMAÇÔES DA CPU
  const cpu = (await si.cpu()).manufacturer + (await si.cpu()).brand;

  //INFORMAÇÕES DA MEMÓRIA RAM
  const mem_total = (await si.mem()).total;
  const memsize = mem_total / 1024 / 1024 / 1024 ;
  const mem_m = (await si.memLayout())[0].manufacturer;
  const mem_t = (await si.memLayout())[0].type;
  const mem = mem_m + ' ' + memsize.toFixed() + ' GB ' + mem_t;

  //INFORMAÇÕES DO DISCO
  const disk_t = (await si.diskLayout())[0].type;
  const disk_n = (await si.diskLayout())[0].name;
  const disk_s = (await si.diskLayout())[0].size;
  const disk_s2 = (disk_s / 1024 / 1024 / 1024)
  const disk = disk_t + ' ' + disk_n + ' ' + disk_s2.toFixed(1) + ' GB'

  //INFORMAÇÕES DA GPU
  const gpu_n = (await si.graphics()).controllers[0].model;
  const gpu_vram = (await si.graphics()).controllers[0].vram;
  const gpu = gpu_n + " | VRAM: " + gpu_vram + " MB"

  const hardware = [
      {
        cpu: (cpu),
        ram: (mem),
        disk: disk,
        gpu: gpu,
      }
  ];
  
  //TESTAR VARIAVEIS
  //console.log(cpu);
  //console.log(mem);
  //console.log(disk);
  //console.log(gpu);

  app.get('/hardware', (req, res) => {
    res.json(hardware);
  });

  app.listen(3000, () => console.log('Server is running'));

})();