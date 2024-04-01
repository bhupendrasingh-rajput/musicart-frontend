export const selectStyles = {
    container: (prev) => ({
        ...prev,
        height: '3vh'
    }),
    indicatorsContainer: (prev) => ({ ...prev, display: 'none' }),
    placeholder: (prev) => ({
        ...prev,
        fontWeight: '500',
        color: '#000000'
    }),
    control: (prev, state) => ({
        ...prev,
        minWidth: '10vw',
        minHeight: '2vh',
        height: '5vh',
        border: "none",
        backgroundColor: "#D9D9D9",
        fontSize: '2vh',
        borderRadius: '1rem',
        textAlign: 'center',
        boxShadow: state.isFocused ? null : null,
    }),
    option: (prev, state) => ({
        ...prev,
        backgroundColor: state.isSelected ? '#0066FF' : null,
        fontSize: 'small'
    })
}

export const sortingStyle = {
    indicatorsContainer: (prev) => ({ ...prev, display: 'none' }),
    container: (prev) => ({
        ...prev,
        height: '3vh'
    }),
    placeholder: (prev) => ({
        ...prev,
        fontWeight: '500',
        color: '#000000'
    }),
    control: (prev, state) => ({
        ...prev,
        minWidth: '9vw',
        minHeight: '2vh',
        height: '5vh',
        border: "2px solid #E1E1E1",
        fontSize: '2vh',
        borderRadius: '1rem',
        textAlign: 'center',
        boxShadow: state.isFocused ? null : null,
    }),
    option: (prev, state) => ({
        ...prev,
        backgroundColor: state.isSelected ? '#0066FF' : null,
        fontSize: 'small'
    })
}

export const feedBackStyle = {
    container: (prev, state) => ({
        ...prev,
        height: '5.3vh',
        width: '15.1vw'
    }),
    placeholder: (prev) => ({
        ...prev,
        fontWeight: '400',
        color: '#919191'
    }),
    control: (prev, state) => ({
        ...prev,
        width: '14.9vw',
        minHeight: '2vh',
        height: '5vh',
        border: "none",
        backgroundColor: "#F3F3F3",
        fontSize: '1.7vh',
        borderRadius: '2vh',
        textAlign: 'left',
        boxShadow: null,
        display: 'flex',
        alignItems: 'center'
    }),
    option: (prev, state) => ({
        ...prev,
        color: '#919191',
        backgroundColor: state.isSelected ? 'transparent' : null,
        borderBottom: '0.5px solid #DDDDDD',
        fontSize: 'small'
    })
}

export const quantitySelectStyles = {
    container: (prev, state) => ({
        ...prev,
        height: '1vh',
        width: '10vw',
    }),
    placeholder: (prev) => ({
        ...prev,
        fontWeight: '500',
        color: '#000000',
        paddingInline: '0.5vw'
    }),
    control: (prev, state) => ({
        ...prev,
        width: '10vw',
        minHeight: '3vh',
        height: '3vh',
        fontSize: '1.5vh',
        borderRadius: '3px',
        padding: '0',
        paddingInline: '0.5vw',
        outline: "none",
        border: state.isFocused ? '1.5px solid #BEBEBE' : "1.5px solid #BEBEBE",
        boxShadow: state.isFocused ? "1.5px solid #BEBEBE" : "1.5px solid #BEBEBE",
        '&:hover': {
            border: state.isFocused ? "1.5px solid #BEBEBE" : "1.5px solid #BEBEBE"
        }
    }),
    option: (prev, state) => ({
        ...prev,
        borderBottom: '0.5px solid #DDDDDD',
        padding: '0',
        fontWeight: '500',
        paddingInline: '1vw',
        fontSize: '1.6vh',
        backgroundColor: '#F9F9F9',
        cursor: 'pointer',
        color: state.isSelected ? '#000000' : '#000000',
    }),
    valueContainer: (prev, state) => ({
        marginTop: '0.5vh',
    }),
    indicatorsContainer: (prev) => ({
        ...prev,
        height: '3vh',
        padding: '0',
    }),
    menu: (prev) => ({
    }),
}


export const paymentSelectStyles = {
    container: (prev, state) => ({
        ...prev,
        height: '6vh',
        width: '100%',
    }),
    placeholder: (prev) => ({
        ...prev,
        fontSize:'2vh',
        fontWeight: '400',
        color: '#797979',
        paddingInline: '0.5vw',
    }),
    control: (prev, state) => ({
        ...prev,
        color:'#797979',
        width: '100%',
        height: '6vh',
        borderRadius: '0.5vh',
        padding: '0',
        paddingInline: '0.5vw',
        outline: "none",
        border: state.isFocused ? '1.5px solid #BEBEBE' : "1.5px solid #BEBEBE",
        boxShadow: state.isFocused ? "1.5px solid #BEBEBE" : "1.5px solid #BEBEBE",
        '&:hover': {
            border: state.isFocused ? "1.5px solid #BEBEBE" : "1.5px solid #BEBEBE"
        },
        backgroundColor:'#F3F3F3'
    }),
    option: (prev, state) => ({
        ...prev,
        border: '0.5px solid #DDDDDD',
        paddingInline: '1vw',
        fontSize: '1.6vh',
        backgroundColor: 'white',
        cursor: 'pointer',
        color: state.isSelected ? '#797979' : '#797979',
    }),
    valueContainer: (prev, state) => ({
        ...prev,
    }),
    indicatorsContainer: (prev) => ({
        ...prev,
    }),
    indicatorSeparator:()=>({
    }),
    menu: (prev) => ({
    }),
}


export const selectStylesMobile = {
    container: (prev) => ({
        ...prev,
        height: '5vh',
        minWidth: 'fit-content',
    }),
    indicatorsContainer: (prev) => ({ ...prev, display: 'none' }),
    placeholder: (prev) => ({
        ...prev,
        fontWeight: '500',
        color: '#000000'
    }),
    control: (prev, state) => ({
        ...prev,
        minHeight: '2vh',
        border: "none",
        backgroundColor: "#D9D9D9",
        borderRadius: '1vh',
        textAlign: 'center',
        boxShadow: state.isFocused ? null : null,
        height: '100%',
        width: '35vw',
        fontSize: '1.5vh',
    }),
    option: (prev, state) => ({
        ...prev,
        backgroundColor: state.isSelected ? '#0066FF' : null,
        fontSize: '1.5vh',
    }),
}
