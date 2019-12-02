import { Font } from '@react-pdf/renderer'

registerTypefacePackage('Lato', [100, 300, 400, 700, 900], true)
registerTypefacePackage('Raleway', [100, 200, 300, 400, 500, 600, 700, 800, 900], true)
registerTypefacePackage('Roboto Slab', [100, 300, 400, 700], false)
registerTypefacePackage('Ubuntu Mono', [400, 700], true)

function registerTypefacePackage(name, weights, italics) {
  const pathName = name.toLowerCase().replace(' ', '-')
  Font.register({ family: name, fonts: weights.map(weight => 
      ({ src: `node_modules/typeface-${pathName}/files/${pathName}-latin-${weight}.woff`, fontStyle: 'normal', fontWeight: weight }))
    .concat(italics? weights.map(weight =>
      ({ src: `node_modules/typeface-${pathName}/files/${pathName}-latin-${weight}italic.woff`, fontStyle: 'italic', fontWeight: weight })) : [])
    });
}
