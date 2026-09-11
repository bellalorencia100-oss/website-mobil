function FaqItem({ pertanyaan, jawaban }) {
  return (
    <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div className="collapse-title font-semibold">{pertanyaan}</div>
      <div className="collapse-content text-sm">{jawaban}</div>
    </div>
  );
}

export default FaqItem;
