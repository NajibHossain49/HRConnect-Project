
export default function StaffCard(props: any) {
    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure className=""><img src={'http://localhost:3444/user/getimage/' + props.data.filename} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title"> {props.data.name}</h2>
                    ID: {props.data.userid} <br />
                    Username: {props.data.username} <br />
                    Email: {props.data.email} <br />
                    Address: {props.data.address} <br />
                    Role: {props.data.role.role} <br />
                </div>
            </div>
        </>
    );
}