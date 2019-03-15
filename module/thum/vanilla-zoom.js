(function(window){
    function define_library() {
        var vanillaZoom = {};
        vanillaZoom.init = function(el) {

            var container = document.querySelector(el);
            if(!container) {
                console.error('没有容器元素. 请确保您使用的是正确的标记.');
                return;
            }

            var firstSmallImage = container.querySelector('.small-preview');
            var zoomedImage = container.querySelector('.zoomed-image');

            if(!zoomedImage) {
                console.error('没有放大图像元素. 请确保您使用的是正确的标记.');
                return;
            }

            if(!firstSmallImage) {
                console.error('页面上没有预览图像. 请确保您使用的是正确的标记.');
                return;
            }
            else {
                // 设置缩放图像的源.
                zoomedImage.style.backgroundImage = 'url('+ firstSmallImage.src +')';
            }

            // 当单击预览时，更改所选图像.
            container.addEventListener("click", function (event) {
                var elem = event.target;

                if (elem.classList.contains("small-preview")) {
                    var imageSrc = elem.src;
                    zoomedImage.style.backgroundImage = 'url('+ imageSrc +')';
                }
            });

            // 鼠标输入的缩放图像.
            zoomedImage.addEventListener('mouseenter', function(e) {
                this.style.backgroundSize = "250%";
            }, false);


            // 根据光标位置显示图像的不同部分.
            zoomedImage.addEventListener('mousemove', function(e) {

                // getBoundingClientReact 提供了关于元素位置的各种信息.
                var dimentions = this.getBoundingClientRect();

                // 计算元素(以像素为单位)内的光标位置.
                var x = e.clientX - dimentions.left;
                var y = e.clientY - dimentions.top;

                // 将光标的位置计算为元素的总宽度/高度的百分比.
                var xpercent = Math.round(100 / (dimentions.width / x));
                var ypercent = Math.round(100 / (dimentions.height / y));

                // 更新图像的背景位置.
                this.style.backgroundPosition = xpercent+'% ' + ypercent+'%';

            }, false);


            // 离开容器时，将图像缩小到正常大小.
            zoomedImage.addEventListener('mouseleave', function(e) {
                this.style.backgroundSize = "cover";
                this.style.backgroundPosition = "center";
            }, false);

        }
        return vanillaZoom;
    }

    // 将vanillaZoom对象添加到全局范围.
    if(typeof(vanillaZoom) === 'undefined') {
        window.vanillaZoom = define_library();
    }
    else{
        console.log("已经定义");
    }
})(window);