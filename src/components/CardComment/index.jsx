const Props = {
  dataComment: Array,
  postId: Number,
};
export const CardComment = ({ dataComment, postId }) => {
  return (
    <>
      {/* {dataComment.post_id === postId && ( */}
      <div className="border border-gray-500 rounded-lg p-3">
        <div className="flex items-center">
          <p className="font-semibold text-gray-500 text-xs">
            {dataComment.name}
          </p>
        </div>
        <p className="mt-3 text-gray-500 text-sm">{dataComment.body}</p>
      </div>
      {/* )} */}
    </>
  );
};
