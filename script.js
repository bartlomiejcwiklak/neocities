function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }).catch(() => {
        alert('failed to copy fucccckkkkk');
    });
}

const emailSpan = document.querySelector('.email');
if (emailSpan) {
    emailSpan.addEventListener('click', function () {
        const email = this.getAttribute('data-email');
        copyToClipboard(email, 'email copied');
    });
}

const discordSpan = document.querySelector('.discord');
if (discordSpan) {
    discordSpan.addEventListener('click', function () {
        const discord = this.getAttribute('data-discord');
        copyToClipboard(discord, 'username copied');
    });
}

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

let tooltipTimeout;
let lastTooltipPosition = { x: 0, y: 0 };

const links = document.querySelectorAll('a[data-tooltip]');
links.forEach(link => {
    link.addEventListener('mouseenter', function () {
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.display = 'block';
    });
    
    link.addEventListener('mousemove', function (e) {
        const newX = e.clientX + 10;
        const newY = e.clientY + 10;
        
        if (newX !== lastTooltipPosition.x || newY !== lastTooltipPosition.y) {
            lastTooltipPosition = { x: newX, y: newY };
            tooltip.style.left = newX + 'px';
            tooltip.style.top = newY + 'px';
            
            if (tooltipTimeout) {
                clearTimeout(tooltipTimeout);
            }
            
            tooltipTimeout = setTimeout(() => {
                tooltip.style.display = 'none';
            }, 2000);
        }
    });
    
    link.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
        }
    });
});
