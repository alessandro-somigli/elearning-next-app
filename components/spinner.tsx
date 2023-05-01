import style from "@/styles/components/spinner.module.scss";

type SpinnerProps = {
  visible: boolean
}

export default function Spinnder(props: SpinnerProps) {
  return (
    <div className={`${style.lds_spinner} ${(props.visible)? style.visible : style.invisible}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
