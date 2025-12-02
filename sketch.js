//let Real1; let Real2; let Real3; let Real4;
//let Virtual1; let Virtual2; let Virtual3; let Virtual4;
let mostrarLetreiro = true;
let brilhoLetreiro = 0;
let aumentandoBrilho = true;
let videoReal; let videoVirtual;
let smallCanvasReal;
let smallCanvasVirtual;
let smallGlitchCanvasReal;
let smallGlitchCanvasVirtual;
let Borrado = -2; let Poster = 10; 
let lastRealIndex = 1;
let lastVirtualIndex = 1; // índice anterior do vídeo virtual
let contador = 0;
let contador2 = 0;
let cont3 = 0;
let opacidade = 0
let veloVirtual = 1
let distorçao = 0
let freq = 7000
let feedback = 0
let glitchAudioReal;
let glitchAudioVirtual; 
let glitchActiveReal = false;
let glitchActiveVirtual = false;
let realVol = 1;
let virtualVol = 0.7;
let sistemaEncerrado = false;
let glitchAudio2;
let sessao = 1;
let modoLimpeza = false;
let audio2Tocado = false;
let brilhoBotao2 = 0;
let brilhoBotao3 = 0;
let aumentandoBotao2 = true;
let botao2Existe = false;
let meuBotao2;
let meuBotao3;

let myGlitch;
let params = {
  randomBytesCount: 500
};


function preload() {
  
  Real1 = createVideo ('real1.mp4');
  Real2 = createVideo ('real2.mp4');
  Real3 = createVideo ('real3.mp4');
 Real4 = createVideo ('real4.mp4');
 Real5 = createVideo('real5.mp4');
 Real6 = createVideo('real6.mp4');
 Real7 = createVideo('real7.mp4');
 Real8 = createVideo('real8.mp4');
  Real9 = createVideo('real9.mp4');
  Real10 = createVideo('real10.mp4');
    Real11 = createVideo('real11.mp4');


  
  Virtual1 = createVideo('virtual1.mp4');
  Virtual2 = createVideo ('virtual2.mp4');
  Virtual3 = createVideo ('virtual3.mp4');
  Virtual4 = createVideo ('virtual4.mp4');
  Virtual5 = createVideo ('virtual5.mp4');
  Virtual6 = createVideo ('virtual6.mp4');
  Virtual7 = createVideo ('virtual7.mp4');
  Virtual8 = createVideo ('virtual8.mp4');
 Virtual9 = createVideo ('virtual9.mp4');
  Virtual10 = createVideo ('virtual10.mp4');
  Virtual11 = createVideo ('virtual11.mp4');  

  
  umClique = loadSound('um clique.mp3');
  //doisCliques = loadSound('dois cliques.mp3');
  glitchAudioReal = loadSound('glitchaudio.mp3');
  glitchAudioVirtual = loadSound('glitchaudio.mp3');
  glitchAudio2 = loadSound('glitchaudio2.mp3');
 
}

function setup() {
   canvas = createCanvas(windowWidth / 1.25, windowHeight / 1.75);
  // canvas pequeno do lado REAL
smallCanvasReal = createGraphics(width / 4, height / 4);

// canvas pequeno do lado VIRTUAL (NOVO!)
smallCanvasVirtual = createGraphics(width / 4, height / 4);

// canvas de glitch do lado REAL (NOVO!)
smallGlitchCanvasReal = createGraphics(width / 4, height / 4);

// canvas de glitch do lado VIRTUAL (NOVO!)
smallGlitchCanvasVirtual = createGraphics(width / 4, height / 4);

  smallTransitionCanvas = createGraphics(width / 2, height / 2);
  overlayTransicao = createGraphics(width, height);
  
  distVirtual = new p5.Distortion(distorçao);
  filtroVirtual = new p5.LowPass(freq);
  delayReal = new p5.Delay();
  
  
  
  // 🟢 CRIAÇÃO E ESTILIZAÇÃO DO BOTÃO DA SESSÃO 2
    meuBotao2 = createButton("CLIQUE PARA RESGATAR"); // Alterado o texto
    meuBotao2.size(250, 70);
    meuBotao2.style("font-size", "22px");
    meuBotao2.style("border", "5px solid red"); // Borda vermelha
    meuBotao2.style("border-radius", "10px");
    meuBotao2.style("color", "red"); // Letras vermelhas
    meuBotao2.style("font-weight", "bold");
    meuBotao2.style("cursor", "pointer");
    meuBotao2.style("background-color", "#000000"); // Fundo Preto (Interior preto)
    meuBotao2.style("transition", "box-shadow 0.3s"); // Transição para o glow
    meuBotao2.mousePressed(chamaLink); // Adiciona a função de clique
    meuBotao2.touchStarted(chamaLink); 
    meuBotao2.hide(); // Esconde até a Sessão 2
    
    // Posiciona o botão corretamente (Será refeito em windowResized)
    meuBotao2.position(width / 2 - meuBotao2.width / 2, height / 2 + 50);
    
    // Chama a função de posicionamento para garantir o centro
    centerButton2();
  
    // 🟢 CRIAÇÃO E ESTILIZAÇÃO DO BOTÃO DA SESSÃO 2
    meuBotao3 = createButton("VOCÊ FOI PREMIADO"); // Alterado o texto
    meuBotao3.size(330, 110);
    meuBotao3.style("font-size", "25px");
    meuBotao3.style("border", "5px solid white"); // Borda vermelha
    meuBotao3.style("border-radius", "12px");
    meuBotao3.style("color", "white"); // Letras vermelhas
    meuBotao3.style("font-weight", "bold");
    meuBotao3.style("cursor", "pointer");
    meuBotao3.style("background-color", "#000000"); // Fundo Preto (Interior preto)
    meuBotao3.style("transition", "box-shadow 0.3s"); // Transição para o glow
    //meuBotao3.mousePressed(chamaLink); // Adiciona a função de clique
    //meuBotao3.touchStarted(chamaLink); 
    meuBotao3.hide(); // Esconde até a Sessão 2
    
    // Posiciona o botão corretamente (Será refeito em windowResized)
    meuBotao3.position(width / 2 - meuBotao3.width / 2, height / 2 - 130);
    
    // Chama a função de posicionamento para garantir o centro
    centerButton2();
  
  setTimeout(() => {
  cont3 += 1;
}, 180000);
  
    setTimeout(() => {
  setInterval (() => {
    min(veloVirtual += 0.009, 5);
  }, 1000)
}, 60000);
  
  
  // Coloca todos os vídeos em arrays para facilitar o sorteio
  videoRealGroup = [Real1, Real2, Real3, Real4, Real5, Real6, Real7, Real8, Real9, Real10, Real11];
  videoVirtualGroup = [Virtual1, Virtual2, Virtual3, Virtual4, Virtual5, Virtual6, Virtual7, Virtual8, Virtual9, Virtual10, Virtual11];
  
  // Esconde todos e para eles
  for (let v of [...videoRealGroup, ...videoVirtualGroup]) {
    v.hide();
    v.stop();
  }

   videoReal = random(videoRealGroup);
  videoVirtual = random(videoVirtualGroup);
  
    // Cria (ou reaproveita) o objeto de glitch
  if (!window.myGlitch) {
    window.myGlitch = new Glitch();
  }
  myGlitch = window.myGlitch;
  
    // A cada 3 segundos, sorteia novo valor aleatório
  setInterval(() => {
    params.randomBytesCount = int(random(0, 500)); // sorteia de 0 a 500
    console.log("Novo valor:", params.randomBytesCount);
  }, 3000);
}
function desenharLetreiro() {
  background(0);

  // efeito de brilho pulsante
  if (aumentandoBrilho) {
    brilhoLetreiro += 4;
    if (brilhoLetreiro >= 255) aumentandoBrilho = false;
  } else {
    brilhoLetreiro -= 4;
    if (brilhoLetreiro <= 80) aumentandoBrilho = true;
  }

  fill(255, brilhoLetreiro);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("CLIQUE PARA INICIAR", width / 2, height / 2);
}

function draw() {

  // LETREIRO ANTES DE TUDO
  if (mostrarLetreiro) {
    desenharLetreiro();
    return;  // impede que o resto desenhe antes do clique
  }
  if (modoLimpeza) return;

  if (sessao === 1) {
    drawSessao1();
  }
  
   if (sessao === 2) {
    drawSessao2();
  }
  
     if (cont3 === 1) {
       drawTransicao(); }
}

function drawSessao1() {
  if (sistemaEncerrado) return;


  background(0);

  let metade = width / 2;

  if (videoReal) {
    if (videoReal.elt.currentTime > 0 && !videoReal.elt.paused) {

      smallCanvasReal.background(0);

      smallCanvasReal.image(videoReal, 0, 0, smallCanvasReal.width, smallCanvasReal.height);

      smallCanvasReal.filter(BLUR, Borrado);
      //smallCanvasReal.filter(DILATE);

      image(smallCanvasReal, 0, 0, metade, height);

      videoReal.speed(veloVirtual);
      videoReal.volume(realVol);

    } else {
      fill(0);
      noStroke();
      rect(0, 0, metade, height);
    }

    delayReal.process(videoReal, 0.9, feedback, 2000);
    delayReal.process(glitchAudioReal, 0.85, feedback, 1500);
  }

  if (videoVirtual) {
    if (videoVirtual.elt.currentTime > 0 && !videoVirtual.elt.paused) {
      image(videoVirtual, metade, 0, metade, height);
      videoVirtual.speed(veloVirtual);
      videoVirtual.volume(virtualVol);
      filter(POSTERIZE, Poster);
    } else {
      videoVirtual.volume(0);
      fill(0);
      noStroke();
      rect(metade, 0, metade, height);
    }
  }

  distVirtual.process(videoVirtual);
  distVirtual.process(glitchAudioVirtual);
  distVirtual.set(distorçao);
  filtroVirtual.process(videoVirtual);
  filtroVirtual.freq(freq);
  filtroVirtual.res(10);

  stroke(255);
  strokeWeight(4);
  line(metade, 0, metade, height);

if (contador > 30 && !videoReal.elt.paused) {
  if (!glitchActiveReal) {
    glitchActiveReal = true;
    playGlitchAudioReal();
  }

  if (frameCount % 12 < 4) {  // ainda reduz processamento
    // desenha o vídeo DIRETO no canvas pequeno
    smallGlitchCanvasReal.image(
      videoReal,
      0, 0,
      smallGlitchCanvasReal.width,
      smallGlitchCanvasReal.height
    );

    // aplica blur no canvas pequeno (leve)
    smallGlitchCanvasReal.filter(BLUR, Borrado / 2);

    // envia para o glitch
    myGlitch.loadImage(smallGlitchCanvasReal);
    myGlitch.resetBytes();
    myGlitch.randomBytes(params.randomBytesCount);
    myGlitch.buildImage();

    // desenha na tela principal escalando
    image(myGlitch.image, 0, 0, metade, height);
  }

} else {
  glitchActiveReal = false;
  if (glitchAudioReal.isPlaying()) glitchAudioReal.stop();
}



if (contador2 > 30 && !videoVirtual.elt.paused) {

  if (!glitchActiveVirtual) {
    glitchActiveVirtual = true;
    playGlitchAudioVirtual();
  }

  if (frameCount % 12 < 4) {

    // canvas pequeno do virtual
    smallGlitchCanvasVirtual.background(0);

    // desenha o vídeo virtual no canvas pequeno
    smallGlitchCanvasVirtual.image(
      videoVirtual,
      0, 0,
      smallGlitchCanvasVirtual.width,
      smallGlitchCanvasVirtual.height
    );

    // SEM blur aqui!

    // aplica glitch no canvas pequeno
    myGlitch.loadImage(smallGlitchCanvasVirtual);
    myGlitch.resetBytes();
    myGlitch.randomBytes(params.randomBytesCount);
    myGlitch.buildImage();

    // redesenha ampliado no lado direito
    image(myGlitch.image, width/2, 0, width/2, height);

    // aplica POSTERIZE (efeito do lado virtual)
    filter(POSTERIZE, Poster);
  }

} else {
  glitchActiveVirtual = false;
  if (glitchAudioVirtual.isPlaying()) glitchAudioVirtual.stop();
}
}

function drawTransicao() {

  // 1️⃣ Desenha a transição em um buffer separado (não toca no canvas principal)
  overlayTransicao.clear();
  overlayTransicao.background(0); // black frame base

  // glitch no canvas pequeno
  smallTransitionCanvas.background(0);
   let frame = smallTransitionCanvas.get();
    if (frame) {
      if (frameCount % 10 < 5) {
  myGlitch.loadImage(smallTransitionCanvas);
  myGlitch.resetBytes();
  myGlitch.randomBytes(params.randomBytesCount);
  myGlitch.buildImage();
      }
    }
  // coloca o glitch dentro do buffer da transição
  overlayTransicao.image(myGlitch.image, 0, 0, width, height);

  // fade in
  opacidade = min(opacidade + 1, 255);

  // 2️⃣ Desenha o buffer FINAL sobre o vídeo sem alterar o vídeo
  push();
  tint(255, opacidade);
  image(overlayTransicao, 0, 0);
  pop();
 
   if (!audio2Tocado && glitchAudio2.isLoaded()) {
   glitchAudio2.loop(); // começa o loop
    glitchAudio2.setVolume(0); // inicia silencioso
      audio2Tocado = true;        // marca como iniciado
  }
  
  if (glitchAudio2.isPlaying()) {
    let vol = map(opacidade, 0, 255, 0, 1); // de 0 a 1
    glitchAudio2.setVolume(vol);
  
  
  if (opacidade >= 255 && !sistemaEncerrado) { 
    encerrarSistema();
}
}
}

function drawSessao2() {
    background(0); // Fundo preto
    
    // 1. Lógica de Brilho Pulsante (mantida para controlar o glow)
    if (aumentandoBotao2) {
        brilhoBotao2 = min(brilhoBotao2 + 5, 255);
        if (brilhoBotao2 >= 255) aumentandoBotao2 = false;
    } else {
        brilhoBotao2 = max(brilhoBotao2 - 5, 100);
        if (brilhoBotao2 <= 100) aumentandoBotao2 = true;
    }
  
      // 1. Lógica de Brilho Pulsante (mantida para controlar o glow)
    if (aumentandoBotao2) {
        brilhoBotao3 = min(brilhoBotao3 + 5, 255);
        if (brilhoBotao3 >= 255) aumentandoBotao2 = false;
    } else {
        brilhoBotao3 = max(brilhoBotao3 - 5, 100);
        if (brilhoBotao3 <= 100) aumentandoBotao2 = true;
    }

    // --- 3. CONFIGURAÇÃO E BRILHO DO BOTÃO HTML (FRENTE) ---
    
    // Torna o botão HTML visível e aplica o glow CSS para reforçar
    meuBotao2.show(); 
    meuBotao2.style("opacity", 1); // Botão totalmente visível
  meuBotao3.show(); 
    meuBotao3.style("opacity", 1); // Botão totalmente visível
  
    
    // Aplica o GLOW CSS no próprio botão HTML (vermelho/branco pulsante)
    let redGlow = `0 0 15px rgba(255, 0, 0, ${brilhoBotao2 / 255})`;
    meuBotao2.style("box-shadow", redGlow);
  
    // Aplica o GLOW CSS no próprio botão HTML (vermelho/branco pulsante)
    let whiteGlow = `0 0 15px rgba(255, 255, 255, ${brilhoBotao3 / 255})`;
    meuBotao3.style("box-shadow", whiteGlow);
    
    // Garante que o estilo do botão esteja conforme o pedido: preto/vermelho
    meuBotao2.style("background-color", "#000000"); // Interior preto
    meuBotao2.style("color", "red"); // Letras vermelhas
    meuBotao2.style("border-color", "red"); // Borda vermelha
  
   meuBotao3.style("background-color", "#000000"); // Interior preto
    meuBotao3.style("color", "white"); // Letras vermelhas
    meuBotao3.style("border-color", "white"); // Borda vermelha
   
}



function mousePressed() {
  if (mostrarLetreiro) {
    mostrarLetreiro = false;
    return; // o primeiro clique é só para iniciar
  }
  
 
  if (sistemaEncerrado) return;  //  ⬅️ BLOQUEIA CLIQUES APÓS ENCERRAR

  let metade = width / 2;  

  umClique.play();
  
  if (mouseX < metade) {
    
    contador += 1;
    
       // Para todos os vídeos do lado esquerdo
    for (let v of videoRealGroup) v.pause();
    
      // Escolhe um vídeo real aleatório diferente do anterior
    let newIndexReal;
    do {
      newIndexReal = floor(random(videoRealGroup.length));
    } while (newIndexReal === lastRealIndex && videoRealGroup.length > 1);
    
    lastRealIndex = newIndexReal; // atualiza o índice
    videoReal = videoRealGroup[newIndexReal];
    toggleVideo(videoReal, videoVirtual, glitchAudioReal, glitchAudioVirtual);
    
    
     let Dr = videoReal.duration();
    if (isFinite(Dr) && Dr > 0) {
    let Rtr = random(Dr);
    videoReal.time(Rtr);
    }
     
    if (Borrado < 7) { 
      Borrado += 0.2 }  
    
    if (feedback < 0.8) { 
    feedback += 0.0175}
    
  } else {
    
    contador2 += 1;
    
    // Para todos os vídeos do lado direito
    for (let v of videoVirtualGroup) v.pause();
    
      // Escolhe um vídeo virtual aleatório diferente do anterior
    let newIndex;
    do {
      newIndex = floor(random(videoVirtualGroup.length));
    } while (newIndex === lastVirtualIndex && videoVirtualGroup.length > 1);
    
    lastVirtualIndex = newIndex; // atualiza o índice
    videoVirtual = videoVirtualGroup[newIndex];
    toggleVideo(videoVirtual, videoReal, glitchAudioVirtual, glitchAudioReal);
    
     let Dv = videoVirtual.duration();
    if (isFinite(Dv) && Dv > 0) {
    let Rtv = random(Dv);
    videoVirtual.time(Rtv);
    }
    if (Poster > 2) {
     Poster -= 0.2; 
     }
    if (distorçao < 0.5) {
     distorçao += 0.002; 
     }
    if (freq > 500) {
     freq -= 200; 
     }
  }
}


function toggleVideo(videoAtivo, videoInativo, audioAtivo, audioInativo) {
  if (!videoAtivo || !videoInativo) return;

  // Para o vídeo e áudio do lado inativo
  videoInativo.pause();
  if (audioInativo && audioInativo.isPlaying()) {
    audioInativo.stop();
  }

  // Toca o vídeo ativo
  if (videoAtivo.elt.paused) {
    videoAtivo.play();

    // Não inicia o áudio aqui — o áudio do glitch será chamado apenas quando contador > 30

    // Loop seguro para mobile
    videoAtivo.elt.onended = () => {
      videoAtivo.play();
    };

  } else {
    // Pausa o vídeo ativo
    videoAtivo.pause();
    // Para o áudio caso esteja tocando
    if (audioAtivo && audioAtivo.isPlaying()) {
      audioAtivo.stop();
    }
  }
}


function playGlitchAudioVirtual() {
  if (!glitchAudioVirtual.isLoaded()) return;

  // Velocidade e volume aleatórios
  glitchAudioVirtual.rate(random(0.7, 2));
  glitchAudioVirtual.setVolume(random(1, 1.4));

  // Começa a tocar em loop
  if (!glitchAudioVirtual.isPlaying()) {
    let dur = glitchAudioVirtual.duration();
    if (isFinite(dur) && dur > 0) {
      let pos = random(dur);
      glitchAudioVirtual.jump(pos); // Pula para posição aleatória
    }
    glitchAudioVirtual.loop();
  }
}

function playGlitchAudioReal() {
  if (!glitchAudioReal.isLoaded()) return;

  // Velocidade e volume aleatórios
  glitchAudioReal.rate(random(0.7, 2));
  glitchAudioReal.setVolume(random(1, 1.4));

  // Começa a tocar em loop
  if (!glitchAudioReal.isPlaying()) {
    let dur = glitchAudioReal.duration();
    if (isFinite(dur) && dur > 0) {
      let pos = random(dur);
      glitchAudioReal.jump(pos); // Pula para posição aleatória
    }
    glitchAudioReal.loop();
  }
}

function encerrarSistema() {  setTimeout(() => { 
  sistemaEncerrado = true;

  // parar todos os vídeos
  for (let v of videoRealGroup) {
    v.pause();
    v.volume(0);
  }

  for (let v of videoVirtualGroup) {
    v.pause();
    v.volume(0);
  }

  // parar todos os áudios
  if (glitchAudioReal.isPlaying()) glitchAudioReal.stop();
  if (glitchAudioVirtual.isPlaying()) glitchAudioVirtual.stop();
  if (umClique.isPlaying()) umClique.stop();
  //if (doisCliques.isPlaying()) doisCliques.stop();

  console.log("SISTEMA ENCERRADO");
  
    // ⬅️ limpa somente vídeos + efeitos
  limparVideosEEfeitos();
}, 10000 )
}
                                        

function limparVideosEEfeitos() {
   setTimeout(() => { 

  // 🔻 1. Remover vídeos do DOM e liberar memória
  for (let v of [...videoRealGroup, ...videoVirtualGroup]) {
    try {
      v.stop();
      v.remove();      // remove <video> do DOM
    } catch(e) {}
  }

  // 🔻 2. Esvaziar arrays e referências
  videoRealGroup = [];
  videoVirtualGroup = [];
  videoReal = null;
  videoVirtual = null;

  // 🔻 3. Limpar efeitos ligados aos vídeos
  try {
    if (delayReal) {
      delayReal.disconnect();
      delayReal = null;
    }
  } catch(e) {}

  try {
    if (distVirtual) {
      distVirtual.dispose?.();
      distVirtual = null;
    }
  } catch(e) {}

  try {
    if (filtroVirtual) {
      filtroVirtual.disconnect();
      filtroVirtual = null;
    }
  } catch(e) {}

  // 🔻 4. Resetar variáveis ligadas aos efeitos
  Borrado = -1;
  Poster = 10;
  veloVirtual = 1;
  distorçao = 0;
  freq = 7000;
  feedback = 0.8;
  contador = 0;
  contador2 = 0;
  lastRealIndex = 1;
  lastVirtualIndex = 1;

  console.log("🧹 Vídeos e efeitos foram limpos da memória");
     
     sessao = 2
   
   }, 5000);
}

function chamaLink() {window.location.href = "https://vnmst.github.io/sessao2/" }

// 🟢 NOVO: Função para posicionar o botão corretamente
function centerButton2() {
    // Obtém a posição do canvas na tela (necessário para posicionar elementos HTML)
    let canvasX = (windowWidth - width) / 2;
    let canvasY = (windowHeight - height) / 2;
}
