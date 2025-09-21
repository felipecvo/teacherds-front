interface Props {
  criteria: { id: string; name: string; description: string }[];
}

const EvaluateCriteria = ({ criteria }: Props) => {
  return criteria.map((criterion) => (
    <div key={criterion.id}>
      <p>{criterion.name}</p>
      {/* Add more UI elements for evaluation as needed */}
    </div>
  ));
};
export default EvaluateCriteria;
