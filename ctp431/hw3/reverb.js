class Reverb {
  constructor(context, parameters) {
    this.context = context;
    this.parameters = parameters;

    this.input = context.createGain();
    this.convolver = context.createConvolver();
    this.output = context.createGain();

    this.wetGain = context.createGain();
    this.dryGain = context.createGain();

    this.input.connect(this.convolver);
    this.convolver.connect(this.wetGain);
    this.input.connect(this.dryGain);

    this.dryGain.connect(context.destination);
    this.wetGain.connect(context.destination);

    this.wetGain.gain.value = parameters.reverbWetDry;
    this.dryGain.gain.value = 1 - parameters.reverbWetDry;

    this.loadIR();
  }

  async loadIR() {
    const response = await fetch('./ir4_dc.wav');
    const audioData = await response.arrayBuffer();
    context.decodeAudioData(audioData, (buffer) => {
      this.convolver.buffer = buffer;
    });
  }

  updateParams(params, value) {
    if (params !== 'reverb_dry_wet') return;

    this.parameters.reverbWetDry = value;
    this.wetGain.gain.value = value;
    this.dryGain.gain.value = 1 - value;
  }
}