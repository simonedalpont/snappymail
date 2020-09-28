(doc => {
	let visible = "visible",
		wakeUp = () => {
			clearTimeout(timer);
			if (status !== visible) {
				status = visible;
			}
			timer = setTimeout(() => {
				if (status === visible) {
					status = "idle";
					dispatchEvent(new CustomEvent("idle"));
				}
			}, 10000);
		},
		status = visible,
		timer = 0,
		init = () => {
			init = ()=>{};
			doc.addEventListener("visibilitychange", () => {
				status = doc.visibilityState;
				doc.hidden || wakeUp();
			});
			wakeUp();
			["mousemove","keyup","touchstart"].forEach(t => doc.addEventListener(t, wakeUp));
			addEventListener("scroll", wakeUp);
		};

	this.ifvisible = {
		idle: callback => {
			init();
			addEventListener("idle", callback);
		},
		now: () => {
			init();
			return status === visible;
		}
	};
})(document);
