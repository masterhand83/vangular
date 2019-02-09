
$(($) => {
	let info = $('#info-drop');
	let activities = $('#activities-drop');
	let file = $('#file-drop');
	if(info){
		console.log('active')
		info.hover(() => {
			info.dropdown('show')
			setTimeout(()=>{
				info.dropdown('hide')
			},2750)
		})
	}
	if(file){
		console.log('active')
		file.hover(() => {
			file.dropdown('show')
			setTimeout(()=>{
				file.dropdown('hide')
			},2750)
		})
	}
	if(activities){
		console.log('active')
		activities.hover(() => {
			activities.dropdown('show')
			setTimeout(()=>{
				activities.dropdown('hide')
			},2750)
		})
	}
	if($('#usuarios')){
		$('#usuarios').DataTable();
	}
})
