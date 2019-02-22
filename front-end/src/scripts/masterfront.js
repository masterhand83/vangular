
$(($) => {
	let info = $('#info-drop');
	let activities = $('#activities-drop');
	let file = $('#file-drop');
	if(info){
		
		info.hover(() => {
			info.dropdown('show')
			setTimeout(()=>{
				info.dropdown('hide')
			},2750)
		})
	}
	if(file){
		
		file.hover(() => {
			file.dropdown('show')
			setTimeout(()=>{
				file.dropdown('hide')
			},2750)
		})
	}
	if(activities){
		
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
