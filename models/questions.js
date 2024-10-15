const { EntitySchema } = require("typeorm");
const Region = require("./regions");

module.exports = new EntitySchema({
	name: "Question", // Entity name
	tableName: "questions", // Correct property for the table name
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: true, // Automatically generated ID
		},
		question: {
			type: "varchar", // Add answers is required
			length: 255,
		},
		question_index: {
			type: "int",
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
	relations: {
		region_id: {
			type: "many-to-one",
			target: Region, // Reference to the actual `Region` model
			joinColumn: {
				name: "region_id", // Optional: You can specify the name of the foreign key column
			},
			inverseSide: "questions", // Should match the relation name in the `Region` entity
		},
	},
	indices: [
		{
			name: "IDX_QUESTION_REGION_ID", // Name of the index
			columns: ["region_id"], // Index on the foreign key regionId
		},
	],
});
