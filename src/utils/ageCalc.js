export const ageCalc = (dataIso) => {
    const today = new Date();
    const birth = new Date(dataIso);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return `${age} ${age === 1 ? 'ano' : 'anos'}`;
};