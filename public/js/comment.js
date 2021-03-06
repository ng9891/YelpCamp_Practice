(() => {
	let deleteForm = document.getElementsByClassName("comment-delete");
	if (deleteForm && deleteForm.length > 0) {
		deleteForm[0].addEventListener("submit", (e) => {
			let confirmation = confirm("Are you sure you want to delete this comment?");
			if (!confirmation) {
				e.preventDefault();
				return false;
			}
			return true;
		});
	}
})();