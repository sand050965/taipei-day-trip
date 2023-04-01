class AvatarController {

	resizeAvatar = (e) => {
		const width = e.target.width;
		const height = e.target.height;
		if (width > height) {
			e.target.classList.remove("wide-avatar-img");
			e.target.classList.add("long-avatar-img");
		} else {
			e.target.classList.remove("long-avatar-img");
			e.target.classList.add("wide-avatar-img");
		}
	};
}

export default AvatarController;
