import { graphql } from "gql.tada";

export const launchesQuery = graphql(
	`
		query LaunchesQuery {
			launches {
				details
				id
				launch_date_local
				launch_date_unix
				launch_date_utc
				mission_name
			}
		}
	`
);

export const launchQuery = graphql(
	`
		query LaunchQuery($id: ID!) {
			launch(id: $id) {
				details
				id
				launch_date_local
				launch_date_unix
				launch_date_utc
				mission_name
			}
		}
	`
);

const RocketFragment = graphql(`
	fragment RocketFragment on Rocket {
		engines {
			propellant_1
			propellant_2
			version
		}
		id
		description
		name
	}
`);

export type RocketFragmentType = typeof RocketFragment;

export const rocketsQuery = graphql(
	`
		query RocketsQuery($limit: Int) {
			rockets(limit: $limit) {
				...RocketFragment
			}
		}
	`,
	[RocketFragment]
);

export const shipsQuery = graphql(
	`
		query ShipsQuery($limit: Int) {
			ships(limit: $limit) {
				id
				image
				name
			}
		}
	`
);
