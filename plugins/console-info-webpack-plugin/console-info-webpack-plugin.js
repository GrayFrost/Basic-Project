import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'
 
figlet.parseFont('Standard', standard);
 
figlet.text('Manage', {
    font: 'Standard',
}, function(err, data) {
    console.log(data);
});

window.system = 'hello world';
window.getSystemInfo = () => window.system;