const socket = io();

    function handleApproval(permissionType, action, userId) {
        fetch(`/${permissionType.toLowerCase()}_${action.toLowerCase()}`, {
            method: "POST",
            body: JSON.stringify({ userId }),
        }).then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                const status = data.hr_approval;
                const elementId = `${action.toLowerCase()}`;
                document.getElementById(elementId).disabled = true;
                document.getElementById(elementId === 'approve' ? 'decline' : 'approve').disabled = false;
                document.getElementById(elementId).innerHTML = `<i class="fas fa-${status === 'Approved' ? 'check-circle' : 'times-circle'}"></i><span class="btn-text">${status}</span>`;
                document.getElementById(elementId === 'approve' ? 'decline' : 'approve').innerHTML = `<i class="fas fa-${status === 'Declined' ? 'check-circle' : 'times-circle'}"></i><span class="btn-text">${status === 'Approved' ? 'Decline' : 'Approve'}</span>`;
                document.getElementById(elementId).style.backgroundColor = status === 'Approved' ? 'green' : 'red';
                document.getElementById(elementId === 'approve' ? 'decline' : 'approve').style.backgroundColor = '#3f3f3f';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    socket.on('${permission_type}_hr_approval_update', function(data) {
        console.log(`${permission_type} details socket`);
        const userId = data.userId;
        const hrApproval = data.hr_approval;
        //document.getElementById(hrApproval.toLowerCase()).textContent = hrApproval;
        if (hrApproval=='Approved'){
            document.getElementById('approve').textContent = hrApproval;
        }
        else if (hrApproval=='Declined'){
            document.getElementById('decline').textContent = hrApproval;
        }
    });