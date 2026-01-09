const UserField = ({ label, value }) => (
    <div className="flex justify-between text-cool-gray">
        <span className="font-semibold text-lg">{label}</span>
        <span>{value}</span>
    </div>
);

export default UserField;
