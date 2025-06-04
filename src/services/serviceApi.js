export const Add_bugs = async (bugData) => {
    try {
        const response = await fetch('http://localhost:5000/api/bugs/add_bugs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bugData)
        });


        const data = await response.json();
    } catch (error) {
    }
};


export const getBugs = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/bugs/bug_get');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching bugs:', error);
        throw error;
    }
}

export const updateBug = async (bugId, updatedData) => {
    console.log('Updating bug with ID:', bugId, 'and data:', updatedData);
    
    try {
        const response = await fetch(`http://localhost:5000/api/bugs/${bugId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating bug:', error);
    }
}


export const deleteBug = async (bugId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/bugs/${bugId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting bug:', error);
    }
}