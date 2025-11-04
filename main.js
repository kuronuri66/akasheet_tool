function qs(selector) {
	return(document.querySelector(selector));
}

const BCTX = qs("#beforeCanvas").getContext('2d',{
	willReadFrequently: true
});
const ACTX = qs("#afterCanvas").getContext('2d', {
	willReadFrequently: true
});

let imgWidth
let imgHeight
let beforeImgData
let afterImgData

let aftercolor = false;
let whitemore = false;
let R_Th = 60;
let G_Th = 60;
let B_Th = 60;



qs("#beforeImgInput").addEventListener('change', (e)=>{
	const imgfile = e.target.files[0];
	if (imgfile && imgfile.type.startsWith('image/')) {
		const IMG = new Image();
		const FILEURL = URL.createObjectURL(imgfile);
		IMG.src = FILEURL;
		IMG.onload = function() {
			imgWidth = IMG.naturalWidth;
			imgHeight = IMG.naturalHeight;
			qs("#beforeCanvas").width = imgWidth;
			qs("#beforeCanvas").height = imgHeight;
			qs("#afterCanvas").width = imgWidth;
			qs("#afterCanvas").height = imgHeight;
			BCTX.drawImage(IMG,0,0);
			beforeImgData = BCTX.getImageData(0,0,imgWidth,imgHeight);
			change()
		}
	} else {
		alert("画像ファイルを選択してくださいしてください")
	}
});

function change(){
	//alert();
	qs("#setting").style.display = "block";
	let i = 0;
	afterImgData = beforeImgData;
	while(i * 4 < beforeImgData.data.length){
		//console.log(beforeImgData.data[i]);
		let r = beforeImgData.data[i*4];
		let g = beforeImgData.data[i*4+1];
		let b = beforeImgData.data[i*4+2];
		if((r<R_Th && g<G_Th && b<B_Th && !whitemore)||(r>R_Th && g>G_Th && b>B_Th && whitemore)){
			if(aftercolor){
				afterImgData.data[i*4] = r;
				afterImgData.data[i*4+1] = g;
				afterImgData.data[i*4+2] = b;
			}else{
				afterImgData.data[i*4] = 0;
				afterImgData.data[i*4+1] = 0;
				afterImgData.data[i*4+2] = 0;
			}
		}else{
			afterImgData.data[i*4] = 255;
			afterImgData.data[i*4+1] = 255;
			afterImgData.data[i*4+2] = 255;
		}
		i++
	}
	ACTX.putImageData(afterImgData, 0, 0);
}

qs("#R_Range").addEventListener('change', ()=>{
	qs("#R_Span").innerHTML = qs("#R_Range").value;
	R_Th = qs("#R_Range").value;
	beforeImgData = BCTX.getImageData(0,0,imgWidth,imgHeight);
	change()
});

qs("#G_Range").addEventListener('change', ()=>{
	qs("#G_Span").innerHTML = qs("#G_Range").value;
	G_Th = qs("#G_Range").value;
	beforeImgData = BCTX.getImageData(0,0,imgWidth,imgHeight);
	change()
});

qs("#B_Range").addEventListener('change', ()=>{
	qs("#B_Span").innerHTML = qs("#B_Range").value;
	B_Th = qs("#B_Range").value;
	beforeImgData = BCTX.getImageData(0,0,imgWidth,imgHeight);
	change()
});

qs("#aftercolor").addEventListener('input', ()=>{
	if (qs("#aftercolor").checked) {
		aftercolor = true;
  	} else {
		aftercolor = false;
  	}
	change()
});

qs("#whitemore").addEventListener('input', ()=>{
	console.log("checked");
	if (qs("#whitemore").checked) {
		whitemore = true;
  	} else {
		whitemore = false;
  	}
	console.log(whitemore);
	change()
});