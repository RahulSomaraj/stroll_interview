const {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Index,
} = require("typeorm");

@Entity("regions")
class Region {
	@PrimaryGeneratedColumn()
	id; // Automatically generated ID

	@Index() // Create an index on the name column
	@Column({ type: "varchar", length: 255, unique: true }) // Ensuring region names are unique
	name;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // Automatically set the createdAt date
	createdAt;

	@DeleteDateColumn({ type: "timestamp", nullable: true }) // Nullable deletedAt for soft deletes
	deletedAt;
}

module.exports = Region;
