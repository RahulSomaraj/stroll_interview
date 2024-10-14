const {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Index,
} = require("typeorm");
const Region = require("./region");

@Entity("questions")
class Question {
	@PrimaryGeneratedColumn()
	id; // Automatically generated ID

	@Column({ type: "varchar", length: 255, unique: true }) // Ensuring region names are unique
	question;

	//add options and answers if required based on requirements of projects

	@Index()
	@ManyToOne(() => Region, (region) => region.id) // Foreign key relationship
	@JoinColumn({ name: "regionId" })
	region;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // Automatically set the createdAt date
	createdAt;

	@DeleteDateColumn({ type: "timestamp", nullable: true }) // Nullable deletedAt for soft deletes
	deletedAt;
}

module.exports = Question;
