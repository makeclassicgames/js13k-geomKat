import json from '@rollup/plugin-json';
import kontra from 'rollup-plugin-kontra';
import terser from '@rollup/plugin-terser';

export default {
  input: 'js/game.js',
  output: {
    dir: 'output',
    format: 'iife',
    compact: true
  },
  plugins: [json(),
    kontra({
      gameObject: {
        // enable only velocity and rotation functionality
        velocity: true,
        rotation: true,
        anchor: true
      },
      sprite:{
        animation: true,
        images: true
      },
      text:{
        newlines: true,
      },
      tileEngine:{
        camera: true,
        query: true
      }
    }),
    terser()
    
  ]
};