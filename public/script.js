document.addEventListener('DOMContentLoaded', () => {
  switchTab('pending');
});

async function fetchData(tab) {
  try {
    const response = await fetch(`/data.json?tab=${tab}`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function renderUsers(tab) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  const users = await fetchData(tab);

  users.forEach(user => {
    const row = userList.insertRow();
    const nameCell = row.insertCell(0);
    const statusCell = row.insertCell(1);

    nameCell.textContent = user.name;
    statusCell.textContent = user.status;
  });
}

function switchTab(tab) {
  renderUsers(tab);
}

function search() {
  const searchInput = document.getElementById('searchInput');
  const filter = searchInput.value.toUpperCase();
  const userTable = document.getElementById('userTable');
  const rows = userTable.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const name = rows[i].cells[0].textContent || rows[i].cells[0].innerText;
    if (name.toUpperCase().indexOf(filter) > -1) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}


function addUser(event) {
  event.preventDefault();

  const userNameInput = document.getElementById('userName');
  const userStatusInput = document.getElementById('userStatus');

  const userName = userNameInput.value.trim();
  const userStatus = userStatusInput.value;

  if (userName && userStatus) {
    const userTable = document.getElementById('userTable');
    const userList = document.getElementById('userList');
    const newRow = userList.insertRow();
    
    const nameCell = newRow.insertCell(0);
    const statusCell = newRow.insertCell(1);

    nameCell.textContent = userName;
    statusCell.textContent = userStatus;

    // Clear the form inputs
    userNameInput.value = '';
    userStatusInput.value = 'pending';
  }
}

