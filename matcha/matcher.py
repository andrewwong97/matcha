from difflib import SequenceMatcher


def fuzzy_partial(s1, s2):
    """
    Helper method to compare similarity of two strings.
    Adapted and improved from:
    http://chairnerd.seatgeek.com/fuzzywuzzy-fuzzy-string-matching-in-python/

    :param s1: string 1
    :param s2: string 2
    :return: similarity ratio
    """
    if len(s1) <= len(s2):
        shorter = s1
        longer = s2
    else:
        shorter = s2
        longer = s1

    seq = SequenceMatcher(None, shorter, longer)
    matches = seq.get_matching_blocks()

    ratios = []
    for match in matches:
        long_start = match[1] - match[0] if (match[1] - match[0]) > 0 else 0
        long_end = long_start + len(shorter)
        long_substr = longer[long_start:long_end]
        seq2 = SequenceMatcher(None, shorter, long_substr)
        rat = seq2.ratio()
        if rat > .995:
            return 1
        else:
            ratios.append(rat)

    return max(ratios)


def match(skills_list, desired_list):
    """
    Sort and fuzzy match list of student skills and listing desired skills
    :param skills_list: student skills list
    :param desired_list: listing desired skills list
    :return: a number between 0 and 1
    """

    skills = ' '.join(skills_list).lower().strip()
    desired = ' '.join(desired_list).lower().strip()

    # Tokenize
    skills_token1 = set(skills.split())
    desired_token1 = set(desired.split())

    # Take intersection and differences
    intersection = skills_token1.intersection(desired_token1)
    diffs1 = skills_token1.difference(desired_token1)
    difft1 = desired_token1.difference(skills_token1)

    # Sort intersection and differences
    sorted_intersection = " ".join(sorted(intersection))
    sorted_StoT = " ".join(sorted(diffs1))
    sorted_TtoS = " ".join(sorted(difft1))

    # Combine sorted intersection + differences, respectively
    combined_StoT = sorted_intersection + " " + sorted_StoT
    combined_TtoS = sorted_intersection + " " + sorted_TtoS

    # Clean strings
    # sorted_intersection = sorted_intersection.strip()
    combined_StoT = combined_StoT.strip()
    combined_TtoS = combined_TtoS.strip()

    return fuzzy_partial(combined_StoT, combined_TtoS)