const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	name: "Region", // Entity name
	tableName: "regions", // Table name in the database
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: true, // Automatically generated ID
		},
		name: {
			type: "varchar",
			length: 255,
			unique: true, // Ensuring region names are unique
		},
		created_at: {
			type: "timestamp",
			createDate: true, // Automatically set the createdAt date
			default: () => "CURRENT_TIMESTAMP",
		},
		deleted_at: {
			type: "timestamp",
			nullable: true, // Nullable deletedAt for soft deletes
			deleteDate: true,
		},
	},
	indices: [
		{
			name: "IDX_REGION_NAME", // Name of the index
			columns: ["name"], // Index on the name column
		},
	],
});
